import FireFlower from 'pages/fireFlower/index.page';
import { apiClient } from 'utils/apiClient';
import { colors } from 'utils/colors/colors';

const convertStructureToNumbers = (structure: (string | null)[][]): number[][] => {
  return structure.map((row) => row.map((cell) => (cell !== null ? colors.indexOf(cell) : -1)));
};

export const useFireFlower = async (id: string) => {
  const props = await apiClient.private.fireFlowers._fireId(id).$get();
  const structure = props.structure;

  const numberStructure = convertStructureToNumbers(structure);

  FireFlower({ shape: numberStructure });
};
