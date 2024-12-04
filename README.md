The main goal of solving this problem was to synchronize the producer and consumer to use the (shared) buffer. That is, when the producer produces data, it must make sure that the buffer has capacity to insert new data. Similarly, the consumer must wait until the producer inserts data and then remove the data from the buffer.
For this, we used a semaphore. A semaphore allows us to control access to the buffer and ensure that two people (producer and consumer) do not access the buffer at the same time and cause interference or data corruption. This method allows the code to run smoothly in different conditions and both processes do their work in harmony.
1)Type your amount
2)Right click on the page and choose inspect
3)result appear

https://uplod.ir/tomzunfwok5x/Recording_2024-12-04_104125.mp4.htm

