package com.kiworld.popuniv.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.kiworld.popuniv.dto.JoinRequest;
import com.kiworld.popuniv.dto.LoginRequest;
import com.kiworld.popuniv.entity.Role;
import com.kiworld.popuniv.entity.User;
import com.kiworld.popuniv.entity.UserGroup;
import com.kiworld.popuniv.repository.UserGroupRepository;
import com.kiworld.popuniv.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserGroupRepository userGroupRepository;

    // Spring Security를 사용한 로그인 구현 시 사용
    // private final BCryptPasswordEncoder encoder;

    /**
     * Email 중복 체크
     * 회원가입 기능 구현 시 사용
     * 중복되면 true return
     */
    public boolean checkEmailDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * nickname 중복 체크
     * 회원가입 기능 구현 시 사용
     * 중복되면 true return
     */
    public boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    /**
     * 회원가입 기능 1
     * 화면에서 JoinRequest(email, password, nickname)을 입력받아 User로 변환 후 저장
     * email, nickname 중복 체크는 Controller에서 진행 => 에러 메세지 출력을 위해
     */
    public void join(JoinRequest req) {
        User user = userRepository.save(req.toEntity());
        UserGroup userGroup = new UserGroup();
        userGroup.setUserId(user.getId());
        userGroup.setGroupId(Integer.valueOf(req.getSelectedId()));
        userGroupRepository.save(userGroup);
    }

    /**
     *  로그인 기능
     *  화면에서 LoginRequest(email, password)을 입력받아 email와 password가 일치하면 User return
     *  email가 존재하지 않거나 password가 일치하지 않으면 null return
     */
    public User login(LoginRequest req) {
        Optional<User> optionalUser = userRepository.findByEmail(req.getEmail());

        // email와 일치하는 User가 없으면 null return
        if(optionalUser.isEmpty()) {
            return null;
        }

        User user = optionalUser.get();

        // 찾아온 User의 password와 입력된 password가 다르면 null return
        if(!user.getPassword().equals(req.getPassword())) {
            return null;
        }

        return user;
    }

    /**
     * userId(Long)를 입력받아 User을 return 해주는 기능
     * 인증, 인가 시 사용
     * userId가 null이거나(로그인 X) userId로 찾아온 User가 없으면 null return
     * userId로 찾아온 User가 존재하면 User return
     */
    public User getLoginUserById(Long userId) {
        if(userId == null) return null;

        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }

    /**
     * email(String)를 입력받아 User을 return 해주는 기능
     * 인증, 인가 시 사용
     * email가 null이거나(로그인 X) userId로 찾아온 User가 없으면 null return
     * email로 찾아온 User가 존재하면 User return
     */
    public User getLoginUserByEmail(String email) {
        if(email == null) return null;

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }
}