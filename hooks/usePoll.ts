import useInterval from "./useInterval";

const usePoll = (callback, condition, interval = 500) => {
  useInterval(
    async () => {
      console.log("polling");

      if (condition) {
        return;
      }
      await callback();
    },
    condition ? interval : null
  );
};

export default usePoll;
