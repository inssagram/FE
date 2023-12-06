export const createEventSource = (
  memberId: number | undefined,
  onMessage: any
) => {
  const eventSource = new EventSource(
    `${process.env.BASE_URL}/notification/subscribe/${memberId}`
  );

  eventSource.addEventListener("sse", (event) => {
    const eventData = JSON.parse(event.data);
    onMessage(eventData);
  });

  eventSource.onerror = (err) => {
    console.error("SSE connection error:", err);
    eventSource.close();
  };

  return eventSource;
};
