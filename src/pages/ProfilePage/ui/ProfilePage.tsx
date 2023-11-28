import classNames from "classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {profileReducer} from "entities/Profile";
import cls from "./ProfilePage.module.scss";

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({className}: ProfilePageProps) => {
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.Profile, {}, [className])}>
        Страница в проработке
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
