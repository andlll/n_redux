/// gml_Object_placeholder_Mouse_7
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(mouse_y, view_yview[0] + view_hview[0] - 100, 1);
if (__b__) {
    __b__ = action_if_variable(act, 1, 0);
    if (__b__) {
        __b__ = action_if_variable(scrolling, 16, 1);
        if (__b__) {
            with (r12) {
                __b__ = action_if_variable(selec, 1, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                with (r12) {
                    __b__ = action_if_variable(mon, 100, 4);
                    if (__b__) {
                        break;
                    }
                }
                if (__b__) {
                    action_create_object(mon_bil, -1559, 680);
                    action_create_object(impa0to1r, 0, 0);
                    with (r12) {
                        mon = mon + -100;
                    }
                    action_kill_object();
                }
            }
            with (r12) {
                __b__ = action_if_variable(selec, 61, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                with (r12) {
                    __b__ = action_if_variable(mon, 1000, 4);
                    if (__b__) {
                        break;
                    }
                }
                if (__b__) {
                    action_create_object(mon_bil, -1559, 680);
                    action_create_object(impasolr, 0, 0);
                    with (r12) {
                        mon = mon + -1000;
                    }
                    action_kill_object();
                }
            }
            with (r12) {
                __b__ = action_if_variable(selec, 72, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                action_create_object(mon_bbil, -1559, 680);
                action_create_object(impaBANKr, 0, 0);
                action_kill_object();
            }
            with (r12) {
                __b__ = action_if_variable(selec, 71, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                action_create_object(mon_bil, -1559, 680);
                action_create_object(impaMONUr, 0, 0);
                with (r12) {
                    mon = mon + -20000;
                }
                action_kill_object();
            }
            with (r12) {
                __b__ = action_if_variable(selec, 63, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                with (r12) {
                    __b__ = action_if_variable(mon, 7500, 4);
                    if (__b__) {
                        break;
                    }
                }
                if (__b__) {
                    action_create_object(mon_bil, -1559, 680);
                    action_create_object(impavil_r, 0, 0);
                    with (r12) {
                        mon = mon + -7500;
                    }
                    action_kill_object();
                }
            }
            with (r12) {
                __b__ = action_if_variable(selec, 62, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                __b__ = action_if_variable(close, 0, 0);
                if (__b__) {
                    with (r12) {
                        __b__ = action_if_variable(mon, 10000, 4);
                        if (__b__) {
                            break;
                        }
                    }
                    if (__b__) {
                        action_create_object(mon_bil, -1559, 680);
                        action_create_object(impagatlingr, 0, 0);
                        with (r12) {
                            mon = mon + -10000;
                        }
                        action_kill_object();
                    }
                }
            }
            with (r12) {
                __b__ = action_if_variable(selec, 60, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                with (r12) {
                    __b__ = action_if_variable(mon, 3500, 4);
                    if (__b__) {
                        break;
                    }
                }
                if (__b__) {
                    action_create_object(mon_bil, -1559, 680);
                    action_create_object(impaclubr, 0, 0);
                    with (r12) {
                        mon = mon + -3500;
                    }
                    action_kill_object();
                }
            }
            with (r12) {
                __b__ = action_if_variable(selec, 7, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                with (r12) {
                    __b__ = action_if_variable(mon, 500, 4);
                    if (__b__) {
                        break;
                    }
                }
                if (__b__) {
                    action_create_object(imparcr, 0, 0);
                    with (r12) {
                        mon = mon + -500;
                    }
                    action_kill_object();
                }
            }
            with (r12) {
                __b__ = action_if_variable(selec, 2, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                with (r12) {
                    __b__ = action_if_variable(mon, 2000, 4);
                    if (__b__) {
                        break;
                    }
                }
                if (__b__) {
                    action_create_object(mon_bil, -1559, 680);
                    action_create_object(impaind0to1r, 0, 0);
                    with (r12) {
                        mon = mon + -2000;
                    }
                    action_kill_object();
                }
            }
            with (r12) {
                __b__ = action_if_variable(selec, 4, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                action_create_object(eoliplacer, 98, 0);
            }
            with (r12) {
                __b__ = action_if_variable(selec, 82, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                action_create_object(eoliplacer, 98, 0);
            }
            with (r12) {
                __b__ = action_if_variable(selec, 5, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                __b__ = action_if_variable(close, 0, 0);
                if (__b__) {
                    with (r12) {
                        __b__ = action_if_variable(mon, 20000, 4);
                        if (__b__) {
                            break;
                        }
                    }
                    if (__b__) {
                        action_create_object(mon_bbil, -1559, 680);
                        action_create_object(impalaser_r, 0, 0);
                        with (r12) {
                            mon = mon + -20000;
                        }
                        action_kill_object();
                    }
                }
            }
            with (r12) {
                __b__ = action_if_variable(selec, 3, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                with (r12) {
                    __b__ = action_if_variable(mon, 5000, 4);
                    if (__b__) {
                        break;
                    }
                }
                if (__b__) {
                    __b__ = action_if_variable(close, 0, 0);
                    if (__b__) {
                        action_create_object(mon_bil, -1559, 680);
                        action_create_object(impamissr, 0, 0);
                        with (r12) {
                            mon = mon + -5000;
                        }
                        action_kill_object();
                    }
                }
            }
            with (r12) {
                __b__ = action_if_variable(selec, 3, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                with (r12) {
                    __b__ = action_if_variable(mon, 5000, 4);
                    if (__b__) {
                        break;
                    }
                }
                if (__b__) {
                    __b__ = action_if_variable(close, 1, 0);
                    if (__b__) {
                        action_create_object(stap, 0, 0);
                    }
                }
            }
            with (r12) {
                __b__ = action_if_variable(selec, 5, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                with (r12) {
                    __b__ = action_if_variable(mon, 20000, 4);
                    if (__b__) {
                        break;
                    }
                }
                if (__b__) {
                    __b__ = action_if_variable(close, 1, 0);
                    if (__b__) {
                        action_create_object(stap, 0, 0);
                    }
                }
            }
            with (r12) {
                __b__ = action_if_variable(selec, 62, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                with (r12) {
                    __b__ = action_if_variable(mon, 10000, 4);
                    if (__b__) {
                        break;
                    }
                }
                if (__b__) {
                    __b__ = action_if_variable(close, 1, 0);
                    if (__b__) {
                        action_create_object(stap, 0, 0);
                    }
                }
            }
        }
    }
}
action_set_relative(0);
