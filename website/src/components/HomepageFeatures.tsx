/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Export',
    image: '/img/export.svg',
    description: (
      <>
        Export i18n files into something else (xlsx, csv, ...)
      </>
    ),
  },
  {
    title: 'Import',
    image: '/img/import.svg',
    description: (
      <>
        Turn a file (xlsx, csv, ...) to i18n file(s)
      </>
    ),
  },
  {
    title: 'Diff',
    image: '/img/diff.svg',
    description: (
      <>
        Compare at least two i18n files and generate a report
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={useBaseUrl(image)} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
    <a href={useBaseUrl('/img/docusaurus.png')}>test</a>
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
