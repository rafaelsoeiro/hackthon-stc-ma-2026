export type FilterOption = {
  label: string;
  value: string;
};

export type FilterField = {
  key: string;
  label: string;
  options: FilterOption[];
};

export type KpiItem = {
  label: string;
  value: string;
  trend?: string;
};

export type DistributionItem = {
  label: string;
  value: string;
  percentage: number;
};

export type DataRow = Record<string, string | number>;

export type AnalyticsPageData = {
  title: string;
  subtitle: string;
  filters: FilterField[];
  kpis: KpiItem[];
  distributionTitle: string;
  distribution: DistributionItem[];
  tableTitle: string;
  tableColumns: { key: string; label: string }[];
  tableRows: DataRow[];
};
