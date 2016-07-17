angular.module('orb.core.templates')
  .provider('TemplateResolver', function () {

    var registeredTemplates = {};
    var templateConfig = {};

    this.configTemplates = function (newTemplateConfig) {
      templateConfig = newTemplateConfig;
    };

    this.registerTemplates = function (newRegisteredTemplates) {
      registeredTemplates = newRegisteredTemplates;
    };

    function TemplateResolver(templates, config) {

      function resolveTemplate(path) {
        var splitPath = path.split('.');
        var template = splitPath.reduce(function index(obj, i) {
          return obj[i];
        }, templates);
        var templateType = splitPath[0];
        return config[templateType].basePath + '/' + template.baseDir + '/' + template.file;
      }

      function resolveBaseDir(type) {
        return templateConfig[type].basePath;
      }

      return {
        resolveTemplate: resolveTemplate,
        resolveBaseDir: resolveBaseDir
      };

    }

    this.$get = function () {
      return (TemplateResolver)(registeredTemplates, templateConfig);
    };

  });
