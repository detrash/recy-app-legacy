import { Menu } from "@headlessui/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import classNames from "classnames";
import { Wallet as WalletIcon } from "phosphor-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const METAMASK_ID = "METAMASK";

type WalletProps = {
  title: string;
};

const Wallet: React.FC<WalletProps> = ({ title }) => {
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  const formattedAddress = `${address?.substring(0, 12)}...`;

  return (
    <main>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className={classNames(
            "inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors duration-150",
            {
              "bg-black bg-opacity-20": !isConnected,
              "bg-teal-600": isConnected,
            }
          )}
          onClick={() => open()}
        >
          {isConnected && address ? (
            <p>{`${address.slice(0, 4)}...${address.slice(-4)}`}</p>
          ) : (
            <>
              Connect Wallet
              <WalletIcon
                className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </>
          )}
        </Menu.Button>
      </Menu>
    </main>
  );
};

export default Wallet;
