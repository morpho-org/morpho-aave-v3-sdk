import { Subscription } from "rxjs";

import { MorphoAaveV3Adapter } from "../../src/MorphoAaveV3Adapter";
import { ADAPTER_MOCK } from "../mocks/mock";

describe("Adapter subjects", () => {
  const userAddress = "0x1c7E6fb5C73e36Eb5C77a7c167c57b552B8c4E1C";
  let adapter: MorphoAaveV3Adapter;
  let subscription: Subscription;

  beforeEach(async () => {
    adapter = MorphoAaveV3Adapter.fromMock(ADAPTER_MOCK);
    await adapter.connect(userAddress);
    await adapter.refreshAll();
  });

  afterEach(() => {
    subscription.unsubscribe();
  });
  describe("are updated on .refreshData()", () => {
    it("userMarketData", async () => {
      const spy = jest.fn();

      subscription = adapter.userMarketsData$.subscribe((data) => {
        spy(data);
      });

      await adapter.refreshData("latest");
      expect(spy).toHaveBeenLastCalledWith(
        expect.objectContaining(
          Object.fromEntries(
            Object.entries(ADAPTER_MOCK.userMarketsData).map(([key, value]) => [
              key,
              expect.objectContaining(value),
            ])
          )
        )
      );
    });
    it("marketsData", async () => {
      const spy = jest.fn();

      subscription = adapter.marketsData$.subscribe((data) => {
        spy(data);
      });

      await adapter.refreshData("latest");
      expect(spy).toHaveBeenCalled();
    });
    it("userData", async () => {
      const spy = jest.fn();

      subscription = adapter.userData$.subscribe((data) => {
        spy(data);
      });

      await adapter.refreshData("latest");
      expect(spy).toHaveBeenCalled();
    });

    it("globalData", async () => {
      const spy = jest.fn();

      subscription = adapter.globalData$.subscribe((data) => {
        spy(data);
      });

      await adapter.refreshData("latest");
      expect(spy).toHaveBeenLastCalledWith(
        expect.objectContaining(ADAPTER_MOCK.globalData)
      );
    });
  });
  describe("are updated on .refreshAll()", () => {
    it("marketList", async () => {
      const spy = jest.fn();

      subscription = adapter.marketsList$.subscribe((data) => {
        spy(data);
      });

      await adapter.refreshAll();
      expect(spy).toHaveBeenLastCalledWith(
        expect.objectContaining(ADAPTER_MOCK.marketsList)
      );
    });
    it("marketsConfigs", async () => {
      const spy = jest.fn();

      subscription = adapter.marketsConfigs$.subscribe((data) => {
        spy(data);
      });

      await adapter.refreshAll();
      expect(spy).toHaveBeenLastCalledWith(
        expect.objectContaining(ADAPTER_MOCK.marketsConfigs)
      );
    });
    it("marketsData", async () => {
      const spy = jest.fn();

      subscription = adapter.marketsData$.subscribe((data) => {
        spy(data);
      });

      await adapter.refreshAll();
      expect(spy).toHaveBeenCalled();
    });
  });
});
