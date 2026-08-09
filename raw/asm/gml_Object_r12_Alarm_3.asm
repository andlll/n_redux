// gml_Object_r12_Alarm_3  locals=1 args=0 len=132
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 3
00000018: conv.i.v
0000001C: push.imm.e 3600
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 1
00000034: conv.i.v
00000038: call action_set_relative(argc=1)
00000040: popz
00000044: push.v time
0000004C: push.imm.e 1
00000050: add.i.v
00000054: pop.v.v time
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: call action_set_relative(argc=1)
0000006C: popz
00000070: push.imm.e 0
00000074: conv.i.v
00000078: call action_set_relative(argc=1)
00000080: popz