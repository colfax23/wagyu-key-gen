import { useHistory } from "react-router-dom";
import React, { FC, ReactElement, useState, Dispatch, SetStateAction } from "react";
import { shell } from "electron";
import styled from "styled-components";
import { Container, Grid, Modal, Tooltip, Typography } from "@material-ui/core";
import { Button } from '@material-ui/core';
import { KeyIcon } from "../components/icons/KeyIcon";
import { NetworkPicker } from "../components/NetworkPicker";
import { tooltips } from "../constants";
import { Network, StepSequenceKey } from '../types'

const StyledMuiContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NetworkDiv = styled.div`
  margin-top: 35px;
  margin-right: 35px;
  align-self: flex-end;
  color: gray;
`;

const LandingHeader = styled(Typography)`
  font-size: 36px;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const SubHeader = styled(Typography)`
  margin-top: 20px;
`;

const Links = styled.div`
  margin-top: 20px;
`;

const StyledLink = styled(Typography)`
  cursor: pointer;
  display: inline;
`;

const OptionsGrid = styled(Grid)`
  margin-top: 50px;
  align-items: center;
`;

type HomeProps = {
  network: Network,
  setNetwork: Dispatch<SetStateAction<Network>>
}

const Home: FC<HomeProps> = (props): ReactElement => {
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [networkModalWasOpened, setNetworkModalWasOpened] = useState(false);
  const [createMnemonicSelected, setCreateMnemonicSelected] = useState(false);
  const [useExistingMnemonicSelected, setUseExistingMnemonicSelected] = useState(false);

  let history = useHistory();

  const sendToGithub = () => {
    shell.openExternal("https://github.com/stake-house/wagyu-key-gen");
  }

  const sendToDiscord = () => {
    shell.openExternal("https://discord.io/ethstaker");
  }

  const handleOpenNetworkModal = () => {
    setShowNetworkModal(true);
    setNetworkModalWasOpened(true);
  }

  const handleCloseNetworkModal = (event: object, reason: string) => {
    if (reason !== 'backdropClick') {
      setShowNetworkModal(false);

      if (createMnemonicSelected) {
        handleCreateNewMnemonic();
      } else if (useExistingMnemonicSelected) {
        handleUseExistingMnemonic();
      }
    }
  }

  const handleCreateNewMnemonic = () => {
    setCreateMnemonicSelected(true);

    if (!networkModalWasOpened) {
      handleOpenNetworkModal();
    } else {
      const location = {
        pathname: `/wizard/${StepSequenceKey.MnemonicGeneration}`
      }

      history.push(location);
    }
  }

  const handleUseExistingMnemonic = () => {
    setUseExistingMnemonicSelected(true);

    if (!networkModalWasOpened) {
      handleOpenNetworkModal();
    } else {
      const location = {
        pathname: `/wizard/${StepSequenceKey.MnemonicImport}`
      }

      history.push(location);
    }
  }

  const tabIndex = (priority: number) => showNetworkModal ? -1 : priority;

  return (
    <StyledMuiContainer>
      <NetworkDiv>
        Select Network: <Button color="primary" onClick={handleOpenNetworkModal} tabIndex={tabIndex(1)}>{props.network}</Button>
      </NetworkDiv>
      <Modal
        open={showNetworkModal}
        onClose={handleCloseNetworkModal}
      >
        <NetworkPicker handleCloseNetworkModal={handleCloseNetworkModal} setNetwork={props.setNetwork} network={props.network}></NetworkPicker>
      </Modal>

      <LandingHeader variant="h1">Welcome!</LandingHeader>
      <KeyIcon />
      <SubHeader>Your key generator for Ethereum 2.0</SubHeader>

      <Links>
        <StyledLink display="inline" color="primary" onClick={sendToGithub} tabIndex={tabIndex(0)}>Github</StyledLink>
        &nbsp;|&nbsp;
        <StyledLink display="inline" color="primary" onClick={sendToDiscord} tabIndex={tabIndex(0)}>Discord</StyledLink>
      </Links>

      <OptionsGrid container spacing={2} direction="column">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleCreateNewMnemonic} tabIndex={tabIndex(1)}>
            Create New Secret Recovery Phrase
          </Button>
        </Grid>
        <Grid item>
          <Tooltip title={tooltips.IMPORT_MNEMONIC}>
            <Button style={{color: "gray"}} size="small" onClick={handleUseExistingMnemonic} tabIndex={tabIndex(1)}>
              Use Existing Secret Recovery Phrase
            </Button>
          </Tooltip>
        </Grid>
      </OptionsGrid>
    </StyledMuiContainer>
  );
};

export default Home;
