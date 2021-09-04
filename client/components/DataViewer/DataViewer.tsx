import * as React from 'react';
import {
  formatKeyToHeader,
  getEnhancedHeaderKeys,
  getValidKeys,
  checkIsNumericalKey,
  checkIsCurrencyKey,
  checkIsPercentageKey,
  checkIsLongNumericalKey,
  convertToUSD,
  convertToPercent,
  convertToPaddedDecimals,
  enhanceEquityDef,
} from '../../../shared/utils/baseUtils';
import { StonkData, EquityDef } from '../../../shared/types/baseTypes';

type StyledNumberProps = {
  value: number;
  children: any;
};

function StyledNumber(props: StyledNumberProps) {
  return <span className={`number ${props.value >= 0 ? 'positive' : 'negative'}`}>{props.children}</span>;
}

type EquityListProps = {
  rowMap: { [k: string]: EquityDef };
};

function EquityList(props: EquityListProps) {
  const { rowMap } = props;
  const headers = getEnhancedHeaderKeys();
  const validKeys = getValidKeys();

  return (
    <div className="equity-list">
      <div className="equity-list__head">
        <div className="equity-list__row">
          {headers.map((key) => {
            if (!validKeys[key]) return null;
            return (
              <div key={key} className="equity-list__cell">
                <p>{formatKeyToHeader(key)}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="equity-list__body">
        {Object.keys(rowMap).map((symbol, i) => {
          const equityDef = rowMap[symbol];
          const enhancedDef = enhanceEquityDef(equityDef);
          const isEven = (i + 1) % 2 === 0;

          return (
            <div key={enhancedDef.symbol} className={`equity-list__row equity-list__row--${isEven ? 'even' : 'odd'}`}>
              {headers.map((key) => {
                if (!validKeys[key]) return null;

                const value = enhancedDef[key];

                let formatted = value;
                const isNumerical = checkIsNumericalKey(key);
                if (isNumerical && checkIsCurrencyKey(key)) formatted = convertToUSD(value);
                if (isNumerical && checkIsPercentageKey(key)) formatted = convertToPercent(value);
                if (isNumerical && checkIsLongNumericalKey(key)) formatted = convertToPaddedDecimals(value, 6);

                return (
                  <div key={`${enhancedDef.symbol}.${key}`} className="equity-list__cell">
                    {isNumerical ? (
                      <p>
                        <StyledNumber value={value}>{formatted}</StyledNumber>
                      </p>
                    ) : (
                      <p>{formatted}</p>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type CategoryComparisonProps = {
  title: string;
  data: Record<string, number>
  total: number;
  colors: Record<string, string>;
}

function CategoryComparison(props: CategoryComparisonProps) {
  return (
    <div className="category-comparison">
      <div className="category-comparison__head">
        <h2>{props.title}</h2>
      </div>
      <div className="category-comparison__body">
        {Object.keys(props.data).map((key) => {
          const value = props.data[key];
          if (value === undefined) return null;

          const allocation = value !== 0 ? value / props.total : 0;
          const color = props.colors[key] || 'white';
          return (
            <div key={key} style={{ backgroundColor: color, width: `${allocation * 100}%` }} className="category-comparison__tag">
              <p>{key}: {value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function createColorMap(keys: string[]): Record<string, string> {
  const colors = [
    'rgba(206, 205, 202, 0.5)',
    'rgba(155, 154, 151, 0.4)',
    'rgba(140, 46, 0, 0.2)',
    'rgba(245, 93, 0, 0.2)',
    'rgba(233, 168, 0, 0.2)',
    'rgba(0, 135, 107, 0.2)',
    'rgba(0, 120, 223, 0.2)',
    'rgba(103, 36, 222, 0.2)',
    'rgba(221, 0, 129, 0.2)',
    'rgba(255, 0, 26, 0.2)',
  ];
  const map: Record<string, string> = {};
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const repeatingIndex = parseInt(i.toString().slice(i.toString().length - 1));
    const color = colors[repeatingIndex];
    map[key] = color;
  }
  return map;
}

export type DataViewerProps<T> = {
  data: T;
  refetch: () => Promise<void>;
};

export function DataViewerStonkData(props: DataViewerProps<StonkData>) {
  const { data } = props;
  if (!data) return null;

  const { rowMap, sectorMap, typeMap, total } = data;
  const sectorColorMap = createColorMap(Object.keys(sectorMap));
  const typeColorMap = createColorMap(Object.keys(typeMap));

  return (
    <div className="data-viewer">
      <div className="data-viewer__head">
        <h1>Personal Finances</h1>
        <h2>
          Total amount invested: <StyledNumber value={total}>{convertToUSD(total)}</StyledNumber>
        </h2>
      </div>
      <div className="data-viewer__body">
        <CategoryComparison title="Asset Types" data={typeMap} total={total} colors={typeColorMap} />
        <CategoryComparison title="Sectors" data={sectorMap} total={total} colors={sectorColorMap} />
        <EquityList rowMap={rowMap} />
      </div>
    </div>
  );
}

