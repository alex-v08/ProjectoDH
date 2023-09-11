package com.oceanwinds.pictures.repository;

import com.oceanwinds.pictures.entity.ProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfilePictureRepository extends JpaRepository<ProfilePicture,Long> {
}
