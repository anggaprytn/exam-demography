type NumToString = (num: number) => string;
type FlagData = (string | number)[];
type StateData = {
  'ID State': string;
  State: string;
  'ID Year': number;
  Year: string;
  Population: number;
  'Slug State': string;
};

export const formatNumber: NumToString = num => {
  return num.toLocaleString('id-ID');
};

export function isSvgImage(url: string): boolean {
  return url.split('.').pop() === 'svg';
}

export function getStateFlagUrl(
  state: string,
  stateData: StateData[],
  flagData: FlagData[],
): string | null {
  const foundState = stateData.find(item => item.State === state);
  if (!foundState) return null;

  const foundFlag = flagData.find(item => item[0] === foundState.State);
  return foundFlag ? (foundFlag[1] as string) : null;
}

export const formatNumberData = (num: number): string => {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1) + 'T';
  }
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const calculateStateMetrics = (data: StateData[]) => {
  if (data.length === 0) {
    return {
      totalStates: 0,
      totalPopulation: 0,
      medianPopulation: 0,
      avgPopulation: 0,
    };
  }

  const totalStates = data.length;
  const totalPopulation = data.reduce((acc, curr) => acc + curr.Population, 0);

  const sortedPopulations = data
    .map(item => item.Population)
    .sort((a, b) => a - b);
  const mid = Math.floor(sortedPopulations.length / 2);

  const medianPopulation =
    sortedPopulations.length % 2 !== 0
      ? sortedPopulations[mid]
      : (sortedPopulations[mid - 1] + sortedPopulations[mid]) / 2;

  const avgPopulation = totalPopulation / totalStates;

  return {
    totalStates,
    totalPopulation,
    medianPopulation,
    avgPopulation,
  };
};

type Feature = {
  type: string;
  id: string;
  properties: {
    name: string;
  };
  geometry: object;
};

type FeatureCollection = {
  type: string;
  features: Feature[];
};

export function getGeometryByName(
  collection: FeatureCollection,
  name: string,
): object | null {
  const feature = collection.features.find(
    data => data.properties.name === name,
  );

  return feature ? feature.geometry : null;
}
