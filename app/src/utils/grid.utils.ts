import i18n from '@/translation/i18n'
import { GridLocaleText } from '@mui/x-data-grid'
import { TFunction } from 'i18next'

export const getGridLocaleText = (
  t?: TFunction<'translation', undefined>
): Partial<GridLocaleText> => {
  t = t ?? i18n.t

  return {
    noRowsLabel: t('globals.grid.noRowsLabel'),
    noResultsOverlayLabel: t('globals.grid.noResultsOverlayLabel'),
    noColumnsOverlayLabel: t('globals.grid.noColumnsOverlayLabel'),
    noColumnsOverlayManageColumns: t(
      'globals.grid.noColumnsOverlayManageColumns'
    ),

    toolbarDensity: t('globals.grid.toolbarDensity'),
    toolbarDensityLabel: t('globals.grid.toolbarDensityLabel'),
    toolbarDensityCompact: t('globals.grid.toolbarDensityCompact'),
    toolbarDensityStandard: t('globals.grid.toolbarDensityStandard'),
    toolbarDensityComfortable: t('globals.grid.toolbarDensityComfortable'),

    toolbarColumns: t('globals.grid.toolbarColumns'),
    toolbarColumnsLabel: t('globals.grid.toolbarColumnsLabel'),

    toolbarFilters: t('globals.grid.toolbarFilters'),
    toolbarFiltersLabel: t('globals.grid.toolbarFiltersLabel'),
    toolbarFiltersTooltipHide: t('globals.grid.toolbarFiltersTooltipHide'),
    toolbarFiltersTooltipShow: t('globals.grid.toolbarFiltersTooltipShow'),
    toolbarFiltersTooltipActive: (count: number) =>
      t('globals.grid.toolbarFiltersTooltipActive', { count }),

    toolbarQuickFilterPlaceholder: t(
      'globals.grid.toolbarQuickFilterPlaceholder'
    ),
    toolbarQuickFilterLabel: t('globals.grid.toolbarQuickFilterLabel'),
    toolbarQuickFilterDeleteIconLabel: t(
      'globals.grid.toolbarQuickFilterDeleteIconLabel'
    ),

    toolbarExport: t('globals.grid.toolbarExport'),
    toolbarExportLabel: t('globals.grid.toolbarExportLabel'),
    toolbarExportCSV: t('globals.grid.toolbarExportCSV'),
    toolbarExportPrint: t('globals.grid.toolbarExportPrint'),
    toolbarExportExcel: t('globals.grid.toolbarExportExcel'),

    columnsManagementSearchTitle: t(
      'globals.grid.columnsManagementSearchTitle'
    ),
    columnsManagementNoColumns: t('globals.grid.columnsManagementNoColumns'),
    columnsManagementShowHideAllText: t(
      'globals.grid.columnsManagementShowHideAllText'
    ),
    columnsManagementReset: t('globals.grid.columnsManagementReset'),
    columnsManagementDeleteIconLabel: t(
      'globals.grid.columnsManagementDeleteIconLabel'
    ),

    filterPanelAddFilter: t('globals.grid.filterPanelAddFilter'),
    filterPanelRemoveAll: t('globals.grid.filterPanelRemoveAll'),
    filterPanelDeleteIconLabel: t('globals.grid.filterPanelDeleteIconLabel'),
    filterPanelLogicOperator: t('globals.grid.filterPanelLogicOperator'),
    filterPanelOperator: t('globals.grid.filterPanelOperator'),
    filterPanelOperatorAnd: t('globals.grid.filterPanelOperatorAnd'),
    filterPanelOperatorOr: t('globals.grid.filterPanelOperatorOr'),
    filterPanelColumns: t('globals.grid.filterPanelColumns'),
    filterPanelInputLabel: t('globals.grid.filterPanelInputLabel'),
    filterPanelInputPlaceholder: t('globals.grid.filterPanelInputPlaceholder'),

    filterOperatorContains: t('globals.grid.filterOperatorContains'),
    filterOperatorDoesNotContain: t(
      'globals.grid.filterOperatorDoesNotContain'
    ),
    filterOperatorEquals: t('globals.grid.filterOperatorEquals'),
    filterOperatorDoesNotEqual: t('globals.grid.filterOperatorDoesNotEqual'),
    filterOperatorStartsWith: t('globals.grid.filterOperatorStartsWith'),
    filterOperatorEndsWith: t('globals.grid.filterOperatorEndsWith'),
    filterOperatorIs: t('globals.grid.filterOperatorIs'),
    filterOperatorNot: t('globals.grid.filterOperatorNot'),
    filterOperatorAfter: t('globals.grid.filterOperatorAfter'),
    filterOperatorOnOrAfter: t('globals.grid.filterOperatorOnOrAfter'),
    filterOperatorBefore: t('globals.grid.filterOperatorBefore'),
    filterOperatorOnOrBefore: t('globals.grid.filterOperatorOnOrBefore'),
    filterOperatorIsEmpty: t('globals.grid.filterOperatorIsEmpty'),
    filterOperatorIsNotEmpty: t('globals.grid.filterOperatorIsNotEmpty'),
    filterOperatorIsAnyOf: t('globals.grid.filterOperatorIsAnyOf'),
    'filterOperator=': t('globals.grid.filterOperator='),
    'filterOperator!=': t('globals.grid.filterOperator!='),
    'filterOperator>': t('globals.grid.filterOperator>'),
    'filterOperator>=': t('globals.grid.filterOperator>='),
    'filterOperator<': t('globals.grid.filterOperator<'),
    'filterOperator<=': t('globals.grid.filterOperator<='),

    headerFilterOperatorContains: t(
      'globals.grid.headerFilterOperatorContains'
    ),
    headerFilterOperatorDoesNotContain: t(
      'globals.grid.headerFilterOperatorDoesNotContain'
    ),
    headerFilterOperatorEquals: t('globals.grid.headerFilterOperatorEquals'),
    headerFilterOperatorDoesNotEqual: t(
      'globals.grid.headerFilterOperatorDoesNotEqual'
    ),
    headerFilterOperatorStartsWith: t(
      'globals.grid.headerFilterOperatorStartsWith'
    ),
    headerFilterOperatorEndsWith: t(
      'globals.grid.headerFilterOperatorEndsWith'
    ),
    headerFilterOperatorIs: t('globals.grid.headerFilterOperatorIs'),
    headerFilterOperatorNot: t('globals.grid.headerFilterOperatorNot'),
    headerFilterOperatorAfter: t('globals.grid.headerFilterOperatorAfter'),
    headerFilterOperatorOnOrAfter: t(
      'globals.grid.headerFilterOperatorOnOrAfter'
    ),
    headerFilterOperatorBefore: t('globals.grid.headerFilterOperatorBefore'),
    headerFilterOperatorOnOrBefore: t(
      'globals.grid.headerFilterOperatorOnOrBefore'
    ),
    headerFilterOperatorIsEmpty: t('globals.grid.headerFilterOperatorIsEmpty'),
    headerFilterOperatorIsNotEmpty: t(
      'globals.grid.headerFilterOperatorIsNotEmpty'
    ),
    headerFilterOperatorIsAnyOf: t('globals.grid.headerFilterOperatorIsAnyOf'),
    'headerFilterOperator=': t('globals.grid.headerFilterOperator='),
    'headerFilterOperator!=': t('globals.grid.headerFilterOperator!='),
    'headerFilterOperator>': t('globals.grid.headerFilterOperator>'),
    'headerFilterOperator>=': t('globals.grid.headerFilterOperator>='),
    'headerFilterOperator<': t('globals.grid.headerFilterOperator<'),
    'headerFilterOperator<=': t('globals.grid.headerFilterOperator<='),

    headerFilterClear: t('globals.grid.headerFilterClear'),

    filterValueAny: t('globals.grid.filterValueAny'),
    filterValueTrue: t('globals.grid.filterValueTrue'),
    filterValueFalse: t('globals.grid.filterValueFalse'),

    columnMenuLabel: t('globals.grid.columnMenuLabel'),
    columnMenuShowColumns: t('globals.grid.columnMenuShowColumns'),
    columnMenuManageColumns: t('globals.grid.columnMenuManageColumns'),
    columnMenuFilter: t('globals.grid.columnMenuFilter'),
    columnMenuHideColumn: t('globals.grid.columnMenuHideColumn'),
    columnMenuUnsort: t('globals.grid.columnMenuUnsort'),
    columnMenuSortAsc: t('globals.grid.columnMenuSortAsc'),
    columnMenuSortDesc: t('globals.grid.columnMenuSortDesc'),

    columnHeaderFiltersTooltipActive: (count) =>
      t('globals.grid.columnHeaderFiltersTooltipActive', { count }),
    columnHeaderFiltersLabel: t('globals.grid.columnHeaderFiltersLabel'),
    columnHeaderSortIconLabel: t('globals.grid.columnHeaderSortIconLabel'),

    footerRowSelected: (count) =>
      t('globals.grid.footerRowSelected', { count }),
    footerTotalRows: t('globals.grid.footerTotalRows'),
    footerTotalVisibleRows: (visibleCount, totalCount) =>
      t('globals.grid.footerTotalVisibleRows', { visibleCount, totalCount }),

    checkboxSelectionHeaderName: t('globals.grid.checkboxSelectionHeaderName'),
    checkboxSelectionSelectAllRows: t(
      'globals.grid.checkboxSelectionSelectAllRows'
    ),
    checkboxSelectionUnselectAllRows: t(
      'globals.grid.checkboxSelectionUnselectAllRows'
    ),
    checkboxSelectionSelectRow: t('globals.grid.checkboxSelectionSelectRow'),
    checkboxSelectionUnselectRow: t(
      'globals.grid.checkboxSelectionUnselectRow'
    ),

    booleanCellTrueLabel: t('globals.grid.booleanCellTrueLabel'),
    booleanCellFalseLabel: t('globals.grid.booleanCellFalseLabel'),

    actionsCellMore: t('globals.grid.actionsCellMore'),

    pinToLeft: t('globals.grid.pinToLeft'),
    pinToRight: t('globals.grid.pinToRight'),
    unpin: t('globals.grid.unpin'),

    treeDataGroupingHeaderName: t('globals.grid.treeDataGroupingHeaderName'),
    treeDataExpand: t('globals.grid.treeDataExpand'),
    treeDataCollapse: t('globals.grid.treeDataCollapse'),

    groupingColumnHeaderName: t('globals.grid.groupingColumnHeaderName'),
    groupColumn: (name) => t('globals.grid.groupColumn', { name }),
    unGroupColumn: (name) => t('globals.grid.unGroupColumn', { name }),

    detailPanelToggle: t('globals.grid.detailPanelToggle'),
    expandDetailPanel: t('globals.grid.expandDetailPanel'),
    collapseDetailPanel: t('globals.grid.collapseDetailPanel'),

    paginationRowsPerPage: t('globals.grid.paginationRowsPerPage'),
    paginationDisplayedRows: ({ from, to, count, estimated }) =>
      t('globals.grid.paginationDisplayedRows', { from, to, count, estimated }),
    paginationItemAriaLabel: (type) =>
      t('globals.grid.paginationItemAriaLabel', { type }),

    rowReorderingHeaderName: t('globals.grid.rowReorderingHeaderName'),

    aggregationMenuItemHeader: t('globals.grid.aggregationMenuItemHeader'),
    aggregationFunctionLabelSum: t('globals.grid.aggregationFunctionLabelSum'),
    aggregationFunctionLabelAvg: t('globals.grid.aggregationFunctionLabelAvg'),
    aggregationFunctionLabelMin: t('globals.grid.aggregationFunctionLabelMin'),
    aggregationFunctionLabelMax: t('globals.grid.aggregationFunctionLabelMax'),
    aggregationFunctionLabelSize: t(
      'globals.grid.aggregationFunctionLabelSize'
    ),
  }
}
