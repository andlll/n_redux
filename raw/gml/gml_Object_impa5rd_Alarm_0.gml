/// gml_Object_impa5rd_Alarm_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(tic, 0, 0);
if (__b__) {
    action_sprite_set(rd15, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 1, 0);
if (__b__) {
    action_sprite_set(rd16, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 2, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd21, 0, 1);
        } else {
            action_sprite_set(rd22, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd23, 0, 1);
        } else {
            action_sprite_set(rd24, 0, 1);
        }
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 3, 0);
if (__b__) {
    action_sprite_set(rd25, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(grubig, 80, 50);
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(grubig, -80, -50);
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(grubig, -80, 50);
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(grubig, 12, -112);
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(grubig, 172, -114);
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 4, 0);
if (__b__) {
    action_sprite_set(rd26, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 5, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd31, 0, 1);
        } else {
            action_sprite_set(rd32, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd33, 0, 1);
        } else {
            action_sprite_set(rd34, 0, 1);
        }
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 6, 0);
if (__b__) {
    action_sprite_set(rd35, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 7, 0);
if (__b__) {
    action_sprite_set(rd36, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 8, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd41, 0, 1);
        } else {
            action_sprite_set(rd42, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd43, 0, 1);
        } else {
            action_sprite_set(rd44, 0, 1);
        }
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 9, 0);
if (__b__) {
    action_sprite_set(rd45, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 10, 0);
if (__b__) {
    action_sprite_set(rd46, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 11, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(dr51, 0, 1);
    } else {
        action_sprite_set(dr52, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 12, 0);
if (__b__) {
    action_sprite_set(dr53, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 13, 0);
if (__b__) {
    action_sprite_set(dr54, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 14, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(dr61, 0, 1);
    } else {
        action_sprite_set(dr62, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 15, 0);
if (__b__) {
    action_sprite_set(dr63, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 16, 0);
if (__b__) {
    action_sprite_set(dr64, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 17, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(dr71, 0, 1);
    } else {
        action_sprite_set(dr72, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 18, 0);
if (__b__) {
    action_sprite_set(dr73, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 19, 0);
if (__b__) {
    action_sprite_set(dr74, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 20, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(dr82, 0, 1);
    } else {
        action_sprite_set(dr81, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 21, 0);
if (__b__) {
    action_sprite_set(dr83, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 22, 0);
if (__b__) {
    action_sprite_set(dr84, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 23, 0);
if (__b__) {
    action_set_relative(1);
    action_create_object(tops5d, 0, -340);
    action_set_relative(0);
    action_set_alarm(1200, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 24, 0);
if (__b__) {
    action_sprite_set(dr83, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 25, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(dr82, 0, 1);
    } else {
        action_sprite_set(dr81, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 26, 0);
if (__b__) {
    action_sprite_set(dr74, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 27, 0);
if (__b__) {
    action_sprite_set(dr73, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 28, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(dr71, 0, 1);
    } else {
        action_sprite_set(dr72, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 29, 0);
if (__b__) {
    action_sprite_set(dr64, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 30, 0);
if (__b__) {
    action_sprite_set(dr63, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 31, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(dr61, 0, 1);
    } else {
        action_sprite_set(dr62, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 32, 0);
if (__b__) {
    action_sprite_set(dr54, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 33, 0);
if (__b__) {
    action_sprite_set(dr53, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 34, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(dr51, 0, 1);
    } else {
        action_sprite_set(dr52, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 35, 0);
if (__b__) {
    action_sprite_set(rd45, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 36, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd41, 0, 1);
        } else {
            action_sprite_set(rd42, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd43, 0, 1);
        } else {
            action_sprite_set(rd44, 0, 1);
        }
    }
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 37, 0);
if (__b__) {
    action_sprite_set(rd36, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 38, 0);
if (__b__) {
    action_sprite_set(rd35, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 39, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd31, 0, 1);
        } else {
            action_sprite_set(rd32, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd33, 0, 1);
        } else {
            action_sprite_set(rd34, 0, 1);
        }
    }
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 40, 0);
if (__b__) {
    action_sprite_set(rd26, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 41, 0);
if (__b__) {
    action_sprite_set(rd25, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 42, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd21, 0, 1);
        } else {
            action_sprite_set(rd22, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd23, 0, 1);
        } else {
            action_sprite_set(rd24, 0, 1);
        }
    }
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 43, 0);
if (__b__) {
    action_sprite_set(rd16, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 44, 0);
if (__b__) {
    action_sprite_set(rd15, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 45, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd11, 0, 1);
        } else {
            action_sprite_set(rd12, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(rd13, 0, 1);
        } else {
            action_sprite_set(rd14, 0, 1);
        }
    }
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 46, 0);
if (__b__) {
    action_kill_object();
}
action_set_relative(0);
