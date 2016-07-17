orb.config(function (TemplateResolverProvider) {

  TemplateResolverProvider.configTemplates({
    PARTIALS: {
      basePath: 'partials'
    },
    COMPONENTS: {
      basePath: 'components'
    }
  });

  TemplateResolverProvider.registerTemplates({
    'PARTIALS': {
      CATEGORY_HEADING: {
        baseDir: 'category_heading',
        file: 'category-heading.html'
      },
      EXPLORED_ITEM_WALL: {
        baseDir: 'explored_item_wall',
        file: 'explored-item-wall.html'
      },
      SUGGEST_TRADE_PANEL: {
        baseDir: 'suggest_trade_panel',
        file: 'suggest-trade-panel.html'
      }
    }
  });

});
