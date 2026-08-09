// gml_Object_sold1_Alarm_0  locals=1 args=0 len=88
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20F5F1C
0000001C: push.v mon
00000024: push.imm.e 20
00000028: add.i.v
0000002C: pop.v.v mon
00000034: popenv 0x40F5F04
00000038: call action_kill_object(argc=0)
00000040: popz
00000044: push.imm.e 0
00000048: conv.i.v
0000004C: call action_set_relative(argc=1)
00000054: popz