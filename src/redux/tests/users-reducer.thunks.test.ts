
import { APIResponseType, EResultCodes } from '../../api/api'
import { followAPI } from '../../api/followAPI';
import { followTh, unfollowTh, userAC } from '../users-reducer';

jest.mock('../../api/followAPI')

const userAPIMock = followAPI as jest.Mocked<typeof followAPI>;

const result: APIResponseType = {
    resultCode: EResultCodes.Success,
    messages: [],
    data: {}
}

userAPIMock.postFollow.mockReturnValue(Promise.resolve(result));
userAPIMock.deleteFollow.mockReturnValue(Promise.resolve(result));

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

describe( 'tests for users-reducer thunks', () => {
    beforeEach(() => {
        dispatchMock.mockClear();
        getStateMock.mockClear();
        userAPIMock.postFollow.mockClear();
        userAPIMock.deleteFollow.mockClear();
    })

    test('success follow thunk', async () => {
        const thunk = followTh(1)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, userAC.toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, userAC.followSuccess(1))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, userAC.toggleFollowingProgress(false, 1))
    })

    test('success unfollow thunk', async () => {
        const thunk = unfollowTh(1)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, userAC.toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, userAC.unfollowSuccess(1))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, userAC.toggleFollowingProgress(false, 1))
    })
  }
)