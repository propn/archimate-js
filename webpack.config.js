const path = require('path');

module.exports = {
  entry: './lib/Viewer.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'archimate-viewer.bundle.js',
    library: 'ArchimateViewer',
    libraryTarget: 'umd'
  },
  externals: {
    'bpmn-js': 'BpmnJS'
  }
};