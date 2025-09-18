package com.uib.avaluapp.action.infrastructure.data.adapters;

import com.uib.avaluapp.action.domain.models.Action;
import com.uib.avaluapp.action.domain.ports.ActionPort;
import com.uib.avaluapp.action.infrastructure.data.models.ActionEntity;
import com.uib.avaluapp.action.infrastructure.data.repositories.ActionRepository;
import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.user.infrastructure.data.models.UserEntity;
import com.uib.avaluapp.user.infrastructure.data.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ActionAdapter implements ActionPort {
    private final ActionRepository actionRepository;
    private final UserRepository userRepository;

    @Override
    public void logAction(Long userId, Action action) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new BaseException(ExceptionCode.USER_NOT_FOUND));

        ActionEntity actionEntity = ActionEntityMapper.INSTANCE.toEntity(action);

        actionEntity.setUser(userEntity);
        actionEntity.setTimestamp(LocalDateTime.now());

        actionRepository.save(actionEntity);
    }

    @Override
    public List<Action> getActionsByUserId(Long userId) {
        List<ActionEntity> actionEntities = actionRepository.findByUserId(userId);

        return ActionEntityMapper.INSTANCE.toDomainList(actionEntities);
    }
}
