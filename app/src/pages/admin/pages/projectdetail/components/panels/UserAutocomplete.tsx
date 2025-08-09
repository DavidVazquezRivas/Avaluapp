import {
  Autocomplete,
  FormControl,
  FormLabel,
  TextField,
  CircularProgress,
} from '@mui/material'
import { User } from '@/models/user.model'
import { Role } from '@/models/role.model'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import getUsersQueryOptions from '../../../users/queries/get.users.query'

interface UserAutocompleteProps {
  selectedUserId?: number
  onUserChange: (userId: number) => void
  defaultUser?: User
  label: string
  placeholder: string
  required?: boolean
}

export const UserAutocomplete: React.FC<UserAutocompleteProps> = ({
  selectedUserId,
  onUserChange,
  defaultUser,
  label,
  placeholder,
  required = false,
}) => {
  const {
    data: usersData,
    isLoading,
    isFetching,
  } = useQuery(getUsersQueryOptions())

  const leads: User[] = useMemo(
    () => usersData?.filter((u: User) => u.role === Role.User) ?? [],
    [usersData]
  )

  const selectedUser = useMemo(
    () => leads.find((l) => l.id === selectedUserId) || defaultUser || null,
    [leads, selectedUserId, defaultUser]
  )

  return (
    <FormControl>
      <FormLabel htmlFor='user-autocomplete'>{label}</FormLabel>
      <Autocomplete
        id='user-autocomplete'
        options={leads}
        getOptionLabel={(option) => option.username}
        value={selectedUser}
        onChange={(_, value) => {
          onUserChange(value?.id ?? 0)
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        loading={isLoading || isFetching}
        disabled={isLoading}
        sx={{ '& .MuiAutocomplete-endAdornment': { display: 'none' } }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            variant='outlined'
            fullWidth
            required={required}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading || isFetching ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </FormControl>
  )
}
