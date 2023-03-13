import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/system/Stack';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { stringAvatar } from '../../Utils';

function UsersList({ users = [], onSelectUser }) {
  return (
    <Box sx={{ display: 'flex', gridGap: '15px' }}>
      {users.map((user) => (
        <Stack
          onClick={() => onSelectUser(user)}
          direction="row"
          spacing={2}
          key={user.id}
          sx={{ display: 'grid', textAlign: 'left', cursor: 'pointer' }}
        >
          <Avatar sx={{ height: '100px', width: '100px' }} {...stringAvatar(user.name)} />
          <UserName>{user.name}</UserName>
        </Stack>
      ))}
    </Box>
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
