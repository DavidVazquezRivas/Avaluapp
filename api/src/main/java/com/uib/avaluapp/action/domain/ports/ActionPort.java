package com.uib.avaluapp.action.domain.ports;

import com.uib.avaluapp.action.domain.models.Action;

import java.util.List;

public interface ActionPort {
    void logAction(Long userId, Action action);

    List<Action> getActionsByUserId(Long userId);
}
