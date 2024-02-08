import { useEffect, useState } from 'react';

interface DenomData {
  body: string[];
}

interface InitialData {
  status: number;
  message: string;
  data: {
    response: {
      billdetails: DenomData[];
    };
  };
}

const useDenomData = (initialData: InitialData | undefined) => {
  const [denomData, setDenomData] = useState<number[]>([]);
  const [filteredData, setFilteredData] = useState<number[]>([]);

  useEffect(() => {
    if (initialData) {
      const billdetails = initialData?.data?.response?.billdetails || [];

      const initialDenom = billdetails.map((item) => parseInt(item.body[0].split('DENOM : ')[1], 10));
      setDenomData(initialDenom);

      const filteredDenom = initialDenom.filter((value) => value >= 10000);
      setFilteredData(filteredDenom);
    }
  }, [initialData]);

  return { denomData, filteredData };
};

export default useDenomData;
