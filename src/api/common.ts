import useAxiosApi from '../common/utils/useAxiosApi';

export function addH5User(data) {
  return useAxiosApi(`/userH5/addH5User`, {
    method: 'POST',
    data,
  });
}
