import { Grid, TextField } from '@material-ui/core';
import React, { FC, ReactElement, Dispatch, SetStateAction } from 'react';
import { errors } from '../../constants';

type VerifyMnemonicProps = {
  setVerifyMnemonic: Dispatch<SetStateAction<string>>,
  error: boolean,
}

const VerifyMnemonic: FC<VerifyMnemonicProps> = (props): ReactElement => {

  const updateInputMnemonic = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setVerifyMnemonic(e.currentTarget.value);
  }

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item xs={12}>
        Please retype your mnemonic here to make sure you have it saved correctly.
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TextField
            id="verify-mnemonic"
            label="Type your mnemonic here"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            color="primary"
            error={props.error}
            helperText={ props.error ? errors.MNEMONICS_DONT_MATCH : ""}
            onChange={updateInputMnemonic} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default VerifyMnemonic;
