export default function fetchService(url) {
  return fetch(url).then(e => e.json());
}
