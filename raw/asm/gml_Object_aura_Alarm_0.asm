// gml_Object_aura_Alarm_0  locals=1 args=0 len=76
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 656
00000014: conv.i.v
00000018: call action_sprite_set(argc=3)
00000020: popz
00000024: push.imm.e -9000
00000028: pop.v.i depth
00000030: push.imm.e 1
00000034: conv.i.v
00000038: push.imm.e 290
0000003C: conv.i.v
00000040: call action_set_alarm(argc=2)
00000048: popz