import React from "react";

export const HowToUse = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-base-100 py-12 md:py-24" id="how-to-use">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl text-primary font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How to Use the GHOFund App
            </h1>
            <p className="m-0 text-accent md:text-xl">
              Unlock the power of GHOFund to manage your treasury and borrow GHO.
            </p>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold">1. Create a New Treasury Contract</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <RocketIcon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-lg font-medium m-0">Create a treasury contract with a single click</p>
                    <p className="text-accent m-0">
                      GHOFund automatically deploys the new treasury contract onto the Ethereum network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">2. Manage Your Treasury</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <LayoutDashboardIcon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-lg font-medium m-0">Access your dashboard to view and manage your treasury</p>
                    <p className="text-accent m-0">
                      See a comprehensive overview including Health Factor, Loan-to-Value ratios, collateral, GHO
                      balance, and more.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <DollarSignIcon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-lg font-medium m-0">Borrow GHO directly from the dashboard</p>
                    <p className="text-accent m-0">
                      Use GHO for stable income for contributors and day-to-day operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">3. Stream Payments to Contributors</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <WalletIcon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-lg font-medium m-0">Set up streaming for contributors</p>
                    <p className="text-accent m-0">
                      Streaming functionality continuously transfers GHO to your DAO&apos;s contributors, giving them a
                      stable income.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <UsersIcon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-lg font-medium m-0">Easy Onboarding: Add builders to the stream</p>
                    <p className="text-accent m-0">
                      You can add builders to the stream by simply clicking on the &quot;Add builder&quot; menu item.
                      You can enter their Ethereum Name Service (ENS) domain or Ethereum address directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DollarSignIcon: React.FC<{ className: string }> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
};

const LayoutDashboardIcon: React.FC<{ className: string }> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
};

const RocketIcon: React.FC<{ className: string }> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
};

const UsersIcon: React.FC<{ className: string }> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};

const WalletIcon: React.FC<{ className: string }> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
};
