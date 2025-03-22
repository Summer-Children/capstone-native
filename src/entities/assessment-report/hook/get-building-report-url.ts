const getReportPdfUrl = (id: string): string =>
    `https://evalo-s3-bucket-mdr.s3.us-west-1.amazonaws.com/assessment_reports/building_asset_inventory_${id}.pdf`

const getReportExcelUrl = (id: string): string =>
    `https://evalo-s3-bucket-mdr.s3.us-west-1.amazonaws.com/assessment/${id}/budget.xlsx`

export { getReportPdfUrl, getReportExcelUrl }
