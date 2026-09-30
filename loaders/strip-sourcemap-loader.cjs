module.exports = function stripSourcemapLoader(source) {
  if (typeof source === 'string') {
    return source.replace(/\/\/#\s*sourceMappingURL=[^\s]+/g, '');
  }
  return source;
};
