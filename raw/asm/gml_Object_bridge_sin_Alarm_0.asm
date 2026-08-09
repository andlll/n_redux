// gml_Object_bridge_sin_Alarm_0  locals=1 args=0 len=124
// locals: arguments
00000000: push.imm.e 25
00000004: pushenv 0x20CD8EC
00000008: call action_kill_object(argc=0)
00000010: popz
00000014: popenv 0x40CD8E0
00000018: push.d -0.2
00000024: conv.d.v
00000028: push.imm.e 5
0000002C: conv.i.v
00000030: push.imm.e 442
00000034: conv.i.v
00000038: call action_sprite_set(argc=3)
00000040: popz
00000044: push.imm.e 1
00000048: conv.i.v
0000004C: push.imm.e 1800
00000050: conv.i.v
00000054: call action_set_alarm(argc=2)
0000005C: popz
00000060: push.imm.e 2
00000064: conv.i.v
00000068: push.imm.e 24
0000006C: conv.i.v
00000070: call action_set_alarm(argc=2)
00000078: popz