import * as React from 'react';

type FooterProps = { brand: string };

export const AppFooter = ({ brand }: FooterProps) => {
  return (
    <footer className="app-footer">
      <p>
        &copy; <span>{brand}</span> {new Date().getFullYear()}, All Rights Reserved.
      </p>
    </footer>
  );
};




