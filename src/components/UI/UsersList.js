import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/system/Stack';
import styled from '@emotion/styled';
import { Container } from '@mui/system/';
import { stringAvatar } from '../../Utils';

function UsersList({ users = [], onSelectUser }) {
  return (
    <Container sx={{ display: 'flex', gridGap: '15px' }}>
      {users.map((user) => (
        <Stack
          onClick={() => onSelectUser(user.id)}
          direction="row"
          spacing={2}
          key={user.id}
          sx={{ display: 'grid', textAlign: 'left', cursor: 'pointer' }}
        >
          <Avatar {...stringAvatar(user.name)} />
          <UserName>{user.name}</UserName>
        </Stack>
      ))}
    </Container>
  );
}

const UserName = styled('small')({
  margin: '0 !important',
  textAlign: 'center',
});

UsersList.propTypes = {
  users: PropTypes.array,
  onSelectUser: PropTypes.func.isRequired,
};

UsersList.defaultProps = {
  users: [],
};

export default UsersList;
