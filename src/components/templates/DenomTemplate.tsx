import React from "react";
import MainLayout from "./MainLayout";
import useDenomData from "../../hooks/useDenom";
import { denomDataMock } from "../../utils/denomDataMock";

const DenomTemplate: React.FC = () => {
  const { denomData, filteredData } = useDenomData(denomDataMock);

  return (
    <MainLayout>
      <div>
        <h2>Denom Data</h2>
        <p>Data Sebelum Filter: {JSON.stringify(denomData)}</p>
        <p>Data Setelah Filter: {JSON.stringify(filteredData)}</p>
      </div>
    </MainLayout>
  );
};

export default DenomTemplate;
