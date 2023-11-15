import { TEST_TESTNET_ACCOUNT_2_BTC_ADDRESS } from '@tests/mocks/constants';
import { SendCryptoAssetSelectors } from '@tests/selectors/send.selectors';
import { SharedComponentsSelectors } from '@tests/selectors/shared-component.selectors';
import { getDisplayerAddress } from '@tests/utils';

import { BtcFeeType } from '@shared/models/fees/bitcoin-fees.model';

import { test } from '../../fixtures/fixtures';

test.describe('send btc', () => {
  test.beforeEach(async ({ extensionId, globalPage, homePage, onboardingPage, sendPage }) => {
    await globalPage.setupAndUseApiCalls(extensionId);
    await onboardingPage.signInWithTestAccount(extensionId);
    await homePage.enableTestMode();
    await homePage.sendButton.click({ force: true });
    await sendPage.selectBtcAndGoToSendForm();
    await sendPage.waitForSendPageReady();
  });

  test.describe('btc send form', () => {
    test('that it shows preview of tx details to be confirmed', async ({ sendPage }) => {
      await sendPage.amountInput.fill('0.00006');
      await sendPage.recipientInput.fill(TEST_TESTNET_ACCOUNT_2_BTC_ADDRESS);

      await sendPage.previewSendTxButton.click({ force: true });
      await sendPage.feesListItem.filter({ hasText: BtcFeeType.High }).click({ force: true });

      const details = await sendPage.confirmationDetails.allInnerTexts();
      test.expect(details).toBeTruthy();
    });
    test('that recipient input is trimmed correctly', async ({ sendPage }) => {
      await sendPage.amountInput.fill('0.00006');
      await sendPage.recipientInput.fill(' ' + TEST_TESTNET_ACCOUNT_2_BTC_ADDRESS + ' ');
      await sendPage.recipientInput.blur();
      await sendPage.page.waitForTimeout(1000);
      await sendPage.previewSendTxButton.click();
      await sendPage.feesListItem.filter({ hasText: BtcFeeType.High }).click({ force: true });

      const displayerAddress = await getDisplayerAddress(sendPage.confirmationDetailsRecipient);
      test.expect(displayerAddress).toEqual(TEST_TESTNET_ACCOUNT_2_BTC_ADDRESS);
    });

    test('that asset value and recipient on preview match input', async ({ sendPage }) => {
      const amount = '0.00006';
      const amountSymbol = 'BTC';

      await sendPage.amountInput.fill(amount);
      await sendPage.recipientInput.fill(TEST_TESTNET_ACCOUNT_2_BTC_ADDRESS);
      await sendPage.recipientInput.blur();
      await sendPage.page.waitForTimeout(1000);

      await sendPage.previewSendTxButton.click({ force: true });
      await sendPage.feesListItem.filter({ hasText: BtcFeeType.High }).click({ force: true });

      const displayerAddress = await getDisplayerAddress(sendPage.confirmationDetailsRecipient);
      test.expect(displayerAddress).toEqual(TEST_TESTNET_ACCOUNT_2_BTC_ADDRESS);

      const confirmationAssetValue = await sendPage.confirmationDetails
        .getByTestId(SharedComponentsSelectors.InfoCardAssetValue)
        .innerText();
      test.expect(confirmationAssetValue).toEqual(`${amount} ${amountSymbol}`);
    });

    test('that fee value on preview match chosen one', async ({ sendPage }) => {
      await sendPage.amountInput.fill('0.00006');
      await sendPage.recipientInput.fill(TEST_TESTNET_ACCOUNT_2_BTC_ADDRESS);

      await sendPage.previewSendTxButton.click({ force: true });

      const feeType = BtcFeeType.Standard;
      const fee = await sendPage.feesListItem
        .filter({ hasText: feeType })
        .getByTestId(SharedComponentsSelectors.FeesListItemFeeValue)
        .innerText();

      await sendPage.feesListItem.filter({ hasText: feeType }).click({ force: true });

      const confirmationFee = await sendPage.confirmationDetails
        .getByTestId(SendCryptoAssetSelectors.ConfirmationDetailsFee)
        .getByTestId(SharedComponentsSelectors.InfoCardRowValue)
        .innerText();

      test.expect(fee).toContain(confirmationFee);
    });
  });
});

//https://github.com/microsoft/playwright/issues/12298
    //   <div class="leather-d_flex leather-flex_column leathe…>…</div> from <div class="leather-d_flex leather-flex_column leathe…>…</div> subtree intercepts pointer events
    // retrying click action, attempt #130
    //   waiting 500ms
    //   waiting for element to be visible, enabled and stable
    //   element is visible, enabled and stable
    //   scrolling into view if needed
    //   done scrolling
    //   <div class="leather-d_flex leather-flex_column leathe…>…</div> from <div class="leather-d_flex leather-flex_column leathe…>…</div> subtree intercepts pointer events
    // retrying click action, attempt #131
    //   waiting 500ms
    //   waiting for element to be visible, enabled and stable
    //   element is visible, enabled and stable
    //   scrolling into view if needed
    //   done scrolling
    //   <div class="leather-d_flex leather-flex_column leathe…>…</div> from <div class="leather-d_flex leather-flex_column leathe…>…</div> subtree intercepts pointer events
    // retrying click action, attempt #132
    //   waiting 500ms
    //   waiting for element to be visible, enabled and stable
    //   element is visible, enabled and stable
    //   scrolling into view if needed
    //   done scrolling
    //   <div class="leather-d_flex leather-flex_column leathe…>…