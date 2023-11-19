
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks';

export const AccountPopover = ({ anchorEl, onClose, open }: { anchorEl: any, onClose: any, open: boolean }) => {

  const navigate = useNavigate();
  const { startLogout } = useAuthStore();
  const { user, roleUser } = useAuthStore();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Cuenta
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {roleUser.name}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem
          onClick={() => {
            startLogout();
            navigate('/');
          }}
        >
          Salir Sesión
        </MenuItem>
      </MenuList>
    </Popover>
  );
};