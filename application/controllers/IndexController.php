<?php

class IndexController extends Application_Controller
{

    public function indexAction() {}

	public function inStockAction() {
		$designs[] = array(
			'brand'				=>	'Dance Naturals',
			'name'				=>	'Garfield',
			'numberNew'			=>	20,
			'numberUsed'		=>	11,
			'numberSellers'		=>	10,
			'numberCountries'	=>	3,
			'priceLow'			=> 61,
			'priceHigh'			=> 100,
			'image'				=> DIR_IMAGES.'/designs/1-1.jpg',
			'imageBook'			=> SITE_ROOT.'/test/test-image-book/layout/none/design/1',
			'popup'				=> SITE_ROOT.'/popups/design-details-selection',
		);
		$designs[] = array(
			'brand'				=>	'Stephanie Professionals',
			'name'				=>	'Stephanie 92005',
			'numberNew'			=>	12,
			'numberUsed'		=>	16,
			'numberSellers'		=>	4,
			'numberCountries'	=>	2,
			'priceLow'			=> 82,
			'priceHigh'			=> 132,
			'image'				=> DIR_IMAGES.'/designs/2-1.jpg',
			'imageBook'			=> SITE_ROOT.'/test/test-image-book/layout/none/design/2',
			'popup'				=> SITE_ROOT.'/popups/design-details-selection',
		);
		$designs[] = array(
			'brand'				=>	'Stephanie Professionals',
			'name'				=>	'Sakura',
			'numberNew'			=>	15,
			'numberUsed'		=>	5,
			'numberSellers'		=>	3,
			'numberCountries'	=>	19,
			'priceLow'			=> 56,
			'priceHigh'			=> 106,
			'image'				=> DIR_IMAGES.'/designs/3-1.jpg',
			'imageBook'			=> SITE_ROOT.'/test/test-image-book/layout/none/design/3',
			'popup'				=> SITE_ROOT.'/popups/design-details-selection',
		);
		$designs[] = array(
			'brand'				=>	'Pro Shoes',
			'name'				=>	'Spinach',
			'numberNew'			=>	7,
			'numberUsed'		=>	6,
			'numberSellers'		=>	7,
			'numberCountries'	=>	1,
			'priceLow'			=> 96,
			'priceHigh'			=> 105,
			'image'				=> DIR_IMAGES.'/designs/4-1.jpg',
			'imageBook'			=> SITE_ROOT.'/test/test-image-book/layout/none/design/4',
			'popup'				=> SITE_ROOT.'/popups/design-details-selection',
		);
		$designs[] = array(
			'brand'				=>	'Pro Dresses',
			'name'				=>	'Lavender',
			'numberNew'			=>	8,
			'numberUsed'		=>	7,
			'numberSellers'		=>	0,
			'numberCountries'	=>	19,
			'priceLow'			=> 72,
			'priceHigh'			=> 145,
			'image'				=> DIR_IMAGES.'/designs/5-1.jpg',
			'imageBook'			=> SITE_ROOT.'/test/test-image-book/layout/none/design/5',
			'popup'				=> SITE_ROOT.'/popups/design-details-selection',
		);
		$designs[] = array(
			'brand'				=>	'Pro Dresses',
			'name'				=>	'Rose Bloom',
			'numberNew'			=>	9,
			'numberUsed'		=>	11,
			'numberSellers'		=>	2,
			'numberCountries'	=>	4,
			'priceLow'			=> 78,
			'priceHigh'			=> 125,
			'image'				=> DIR_IMAGES.'/designs/6-1.jpg',
			'imageBook'			=> SITE_ROOT.'/test/test-image-book/layout/none/design/6',
			'popup'				=> SITE_ROOT.'/popups/design-details-selection',
		);
		$designs[] = array(
			'brand'				=>	'Pro Dresses',
			'name'				=>	'Lily',
			'numberNew'			=>	8,
			'numberUsed'		=>	5,
			'numberSellers'		=>	2,
			'numberCountries'	=>	12,
			'priceLow'			=> 58,
			'priceHigh'			=> 143,
			'image'				=> DIR_IMAGES.'/designs/7-1.jpg',
			'imageBook'			=> SITE_ROOT.'/test/test-image-book/layout/none/design/7',
			'popup'				=> SITE_ROOT.'/popups/design-details-selection',
		);


		
		$this->view->designs = $designs;
	}

	public function aMyaccountAction() {}
	public function aMybalanceDancerialtocreditAction() {}
	public function aMybalanceGiftcardsAction() {}
	public function aMybalanceOverviewAction() {}
	public function aMybalanceRewardpointsAction() {}
	public function aMyinfoBasicAction() {}
	public function aMyinfoMeasurementsAction() {}
	public function aMyinfoSellerinfoAction() {}
	public function aMyinfoShippingaddressAction() {}
	public function aMylistingsAction() {}
	public function aMylistingsProductStockingAction() {}
	public function aMymessagesOrdermessagesAction() {}
	public function aMymessagesOverviewAction() {}
	public function aMymessagesProductqaAction() {}
	public function aMyordersArbitrationAction() {}
	public function aMyordersBoughtordersCompletedAction() {}
	public function aMyordersBoughtordersPendingAction() {}
	public function aMyordresMessageThreadAction() {}
	public function aMyordersOverviewAction() {}
	public function aMysalesOverviewAction() {}
	public function aMysalesPackageSlipAction() {}
	public function aMyordersReturnPackageSlipAction() {}
	public function aMyordersSoldordersCompletedAction() {}
	public function aMyordersSoldordersPendingAction() {}
	public function aMystoresAction() {}
	public function aSettingsAccountAction() {}
	public function aSettingsNotificationsAction() {}
	public function checkoutAction() {}
	public function compareListAction() {}
	public function contactAction() {}
	public function customizableAction() {}
	public function draAdminsAction() {}
	public function draArbitrationsCurrentAction() {}
	public function draArbitrationsPastAction() {}
	public function draBalanceDrccompletedAction() {}
	public function draBalanceDrcpendingAction() {}
	public function draBalanceGccompletedAction() {}
	public function draBalanceGcpendingAction() {}
	public function draBalanceMoneycompletedAction() {}
	public function draBalanceMoneypendingAction() {}
	public function draBalanceOverviewAction() {}
	public function draBalanceRpcompletedAction() {}
	public function draBalanceRppendingAction() {}
	public function draMessagesAction() {}
	public function draOrdersCompletedAction() {}
	public function draOrdersInprogressAction() {}
	public function draOrdersIntransitAction() {}
	public function draPromotionsAutoAction() {}
	public function draPromotionsGlobalAction() {}
	public function draPromotionsIndividualAction() {}
	public function draSettingsAction() {}
	public function draStatisticsAction() {}
	public function draUsersAction() {}
	public function list3Action(){}
	public function list4Action() {}
	public function list5Action() {}
	public function list6CustomAction() {}
	public function list6StockAction() {}
	public function listAction() {}
	public function orderConfirmationAction() {}
	public function orderVerificationAction() {}
	public function productCompareListAction() {}
	public function pQaCommentAction() {}
	public function returnPolicyAction() {}
	public function sellerFeedbackAction() {}
	public function scDetailsAction() {}
	public function storeInfoAction() {}
	public function storeListingsBarcodecheckoutAction() {}
	public function storeListingsBarcoderestockAction() {}
	public function storeListingsManagestockAction() {}
	public function storeListingsVariationsAction() {}
	public function storeListingsAction() {}
	public function storeManageadminsAction() {}
	public function storebalanceCompletedtransactionsAction() {}
	public function storebalancePendingtransactionsAction() {}
	public function storemessagesNotificationsAction() {}
	public function storemessagesOrdermessagesAction() {}
	public function storemessagesProductqaAction() {}
	public function storeordersArbitrationAction() {}
	public function storeordersOverviewAction() {}
	public function storeordersSoldordersCompletedAction() {}
	public function storeordersSoldordersInprogressAction() {}
	public function storesettingsStoreAction() {}
	public function storesettingsTreasurerAction() {}
	public function storesettingsAction() {}
	
}