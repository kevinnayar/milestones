import * as React from 'react';
import { DateTime, DateObject } from 'luxon';
import { Link } from 'react-router-dom';
import { simpleDateToDateObject } from '../../../common/utils/typeUtils';
import { SimpleDate } from '../../../common/types/baseTypes';

type GridFormatter = (_value: any) => string | JSX.Element;

export type GridHeader = [
  key: string,
  name: string,
  visible: boolean,
  formatter?: GridFormatter,
];

type GridProps = {
  headers: GridHeader[];
  rows: any[];
  linker?: {
    route: string;
    key: string;
  };
};

export const Grid = ({ headers, rows, linker }: GridProps) => {
  return (
    <table className="grid">
      <thead>
        <tr className="grid__header grid__row">
          {headers.map(([key, name, visible]) => {
            return visible ? (
              <th key={`header.${key}`} className="grid__header-item grid__row-item">
                {name}
              </th>
            ) : null;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="grid__row">
            {headers.map(([key, , visible, formatter]) => {
              if (!visible) return null;

              const formatted = formatter ? formatter(row[key]) : row[key];

              return linker ? (
                <td key={`row.${key}`} className="grid__row-item">
                  <Link to={`${linker.route}${row[linker.key]}`}>{formatted}</Link>
                </td>
              ) : (
                <td key={`row.${key}`} className="grid__row-item">
                  {formatted}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export function gridFormatterListLength(v: any[]) {
  return `${v.length}`;
}

export function gridFormatterDateTime(v: number | SimpleDate) {
  const format = DateTime.DATE_MED;

  if (typeof v === 'object') {
    const d: DateObject = simpleDateToDateObject(v);
    return DateTime.fromObject(d).toLocaleString(format);
  }

  return DateTime.fromMillis(v).toLocaleString(format);
}

export function gridFormatterJson(v: Record<string, unknown>) {
  return <pre>{JSON.stringify(v, null, 2)}</pre>;
}

export function gridFormatterBoolean(v: boolean) {
  return <i className="material-icons">{v ? 'task_alt' : 'highlight_off'}</i>;
}




