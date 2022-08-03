import "./VaultItem.scss";
import { useState } from "react";
import { Grid, GridItem, Box, Avatar, Center, SimpleGrid, Flex, Text, Button, Link, Collapse } from "@chakra-ui/react";
import Modal from "components/Modal/Modal";
import StakeModal from "components/StakeModal/StakeModal";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import useToken from "../../hooks/useToken";

const VaultInfo = ({ children, title }) => {
  return (
    <Box my={4} fontSize={14} display="flex">
      <Text>{title} </Text>
      <Text fontWeight="bold" ml={2}>
        {children}
      </Text>
    </Box>
  );
};

const VaultLink = ({ children, link }) => {
  return (
    <Link href={link} isExternal my={4} color="blue.500">
      {children} <ExternalLinkIcon mx="2px" />
    </Link>
  );
};

const VaultElement = ({ children }) => {
  return (
    <Flex>
      <Center>
        <Text fontSize={16}>{children}</Text>
      </Center>
    </Flex>
  );
};

const VaultButton = ({ children, onClick }) => {
  return (
    <Button variant={"outline"} colorScheme="teal" size="md" w="80%" my={4} mx={"auto"} p={3} onClick={onClick}>
      {children}
    </Button>
  );
};

export default function VaultItem({ logo, name, apr, tvl }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isOpen, setIsOpen] = useState();
  const { balance, contractTokenAdress } = useToken();

  const onToggleDetails = () => {
    setShowDetails((_showDetails) => !_showDetails);
  };

  const onToggleStake = () => {
    setIsOpen((_isOpen) => !_isOpen);
  };

  const TOTAL_LOCKED = "172 BYX";
  const MY_BALANCE = balance && `${balance} ${name}`;
  const NETWORK_SCAN = "etherscan.io";
  const CONTRACT_ETHERSCAN = contractTokenAdress && `https://${NETWORK_SCAN}/address/${contractTokenAdress}`;
  const REWARD_IN_CRYPTO = `27 ${name}`;
  const REWARD_IN_USD = "100 USD";

  return (
    <Box borderWidth="2px" borderRadius="20" p={5}>
      <Modal isOpen={isOpen} onClose={onToggleStake} width={"50%"} height={"70%"}>
        <StakeModal total={balance} />
      </Modal>

      <SimpleGrid columns={5} justify="center" align="center">
        <Avatar src={logo} />
        <VaultElement>{name || "?"}</VaultElement>
        <VaultElement>{apr || "?"}</VaultElement>
        <VaultElement>{tvl || "?"}</VaultElement>

        <Button colorScheme="teal" size="md" onClick={onToggleDetails} my="auto">
          Details
        </Button>
      </SimpleGrid>
      <Collapse in={showDetails} animateOpacity>
        <Grid templateColumns="repeat(4, 1fr)" gap={2} h="100%">
          <GridItem w="100%" colSpan={1} py={5}>
            <VaultInfo title="MyBalance:">{MY_BALANCE}</VaultInfo>
            <VaultInfo title="Total staked:">{TOTAL_LOCKED}</VaultInfo>
            <VaultLink link={CONTRACT_ETHERSCAN}>View Contract</VaultLink>
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <Flex width="100%" height="100%" justify={"center"} align="center">
              <Box borderWidth="1px" borderRadius="20" width="80%" height="80%" p={8}>
                <Text fontSize={16}>Rewards</Text>
                <Text fontSize={16}>{REWARD_IN_CRYPTO}</Text>
                <Text fontSize={16}>{REWARD_IN_USD}</Text>
              </Box>
            </Flex>
          </GridItem>
          <GridItem w="100%" colSpan={1}>
            <Flex width="100%" height="100%" justify={"center"} align="center" p={10} direction={"column"}>
              <VaultButton onClick={onToggleStake}>Stake {name}</VaultButton>
              <VaultButton onClick={onToggleStake}>Unstake {name}</VaultButton>
            </Flex>
          </GridItem>
        </Grid>
      </Collapse>
    </Box>
  );
}

//<Button onClick={() => setIsOpen((isOpen) => !isOpen)}>sqdqs</Button>
