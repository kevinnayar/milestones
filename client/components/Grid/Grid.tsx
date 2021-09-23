import * as React from 'react';
import { ReactNode } from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

type GridFormatter = (_value: unknown) => string | ReactNode;

// [key, name, visible, formatter]
export type GridHeader =
  | [string, string, boolean]
  | [string, string, boolean, GridFormatter];

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
              return linker ? (
                <td key={`row.${key}`} className="grid__row-item">
                  <Link to={`${linker.route}${row[linker.key]}`}>
                    {formatter ? formatter(row[key]) : row[key]}
                  </Link>
                </td>
              ) : (
                <td key={`row.${key}`} className="grid__row-item">
                  {formatter ? formatter(row[key]) : row[key]}
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

export function gridFormatterDateTime(v: number) {
  return DateTime.fromMillis(v).toLocaleString(DateTime.DATE_MED);
}

