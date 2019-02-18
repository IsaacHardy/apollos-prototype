/* eslint-disable import/prefer-default-export */

export class RockLoggingExtension {
  // eslint-disable-next-line class-methods-use-this
  willSendResponse({
    context: { dataSources: respDataSources },
    graphqlResponse: { data },
  }) {
    let totalNetworkCalls = 0;
    const calls = {};
    Object.values(respDataSources).forEach((ds) => {
      if (ds.callCount) {
        totalNetworkCalls += ds.callCount;
      }
      if (ds.calls) {
        Object.keys(ds.calls).forEach((callPath) => {
          if (!calls[callPath]) {
            calls[callPath] = 0;
          }
          calls[callPath] += ds.calls[callPath];
        });
      }
    });
    const callTable = Object.keys(calls)
      .map((callPath) => `${decodeURI(callPath)}: ${calls[callPath]}`)
      .join('\n');
    console.log(
      `While running query: ${Object.keys(data)[0]}
Total Network Calls: ${totalNetworkCalls}
${callTable}
`
    );
  }
}
