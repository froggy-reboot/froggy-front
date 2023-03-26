export default function compareTime(timeStamp: string) {
  const currentTime = new Date();
  const createdTime = new Date(timeStamp);

  const diffSeconds = (currentTime.valueOf() - createdTime.valueOf()) / 1000;

  return [diffSeconds, createdTime] as const;
}
