import fs from 'fs';
import util from 'util';
import { DataSource } from 'apollo-datasource';
import { UserInputError } from 'apollo-server';
import { promise as DataURI } from 'datauri';
import ApollosConfig from '@apollosproject/config';

const readFile = ({ templateFile, charSet }) =>
  util.promisify(fs.readFile)(templateFile, charSet);

export default class Pass extends DataSource {
  initialize(config) {
    this.context = config.context;
    this.cache = config.cache;
  }

  getPassPathFromTemplateName = ({ templateName }) =>
    ApollosConfig.PASS.TEMPLATES[templateName];

  async getRawPassTemplate({ templateFile }) {
    // try to use cache:
    const cacheHit = await this.tryCacheRead({ key: templateFile });
    if (cacheHit) return cacheHit;

    const template = await readFile({ templateFile, charSet: 'utf-8' });
    await this.tryCacheWrite({ key: templateFile, value: template });

    return template;
  }

  getFromId = (template) =>
    this.context.dataSources.Pass.generatePassData({
      template,
    });

  async generatePassData({
    template,
    currentPersonId,
    includeImageDataURIs = true,
  } = {}) {
    let compiledTemplate = await this.compileTemplate({
      template,
      currentPersonId,
    });

    let images = {};
    if (includeImageDataURIs) {
      images = {
        logo: this.getPassImage({ template, image: 'icon' }),
        thumbnail: this.getPassImage({ template, image: 'thumbnail' }),
      };
    }

    // mixin data for graphql:
    compiledTemplate = {
      template,
      ...images,
      ...compiledTemplate,
    };

    return compiledTemplate;
  }

  async compileTemplate({ template, currentPersonId }) {
    if (!template) throw new UserInputError('no pass template provided');

    const templateFile = `${this.getPassPathFromTemplateName({
      templateName: template,
    })}/pass.json`;
    const rawTemplate = await this.getRawPassTemplate({ templateFile });

    let compiledTemplate = rawTemplate;
    if (this.context.dataSources.Template) {
      compiledTemplate = await this.context.dataSources.Template.renderTemplate(
        {
          template: rawTemplate,
          currentPersonId,
        }
      );
    }
    compiledTemplate = JSON.parse(compiledTemplate);

    return compiledTemplate;
  }

  getPassImage = async ({ template, image }) => {
    const cacheKey = `${template}/${image}`;

    const cacheHit = await this.tryCacheRead({ key: cacheKey });
    if (cacheHit) return cacheHit;

    const templatePath = this.getPassPathFromTemplateName({
      templateName: template,
    });

    // try @2x first, fallback to normal res
    // Swallowing errors because these images are optional
    const uri = await (async () => {
      try {
        return await DataURI(`${templatePath}/${image}@2x.png`);
      } catch (e) {
        try {
          return await DataURI(`${templatePath}/${image}.png`);
        } catch (e2) {
          return null;
        }
      }
    })();

    return { uri };
  };

  async tryCacheRead({ key }) {
    try {
      const cacheHit = await this.cache.get(key);
      if (cacheHit) return cacheHit;
    } catch (e) {
      // we don't care if cache is failing, for better or worse...so just log it:
      console.warn('Error trying to read from cache: ', e);
    }
    return null;
  }

  async tryCacheWrite({ key, value }) {
    try {
      await this.cache.set(key, value);
    } catch (e) {
      // we don't care if cache isn't working, for better or worse...so just log it:
      console.warn('Error saving result to cache: ', e);
    }
  }
}
