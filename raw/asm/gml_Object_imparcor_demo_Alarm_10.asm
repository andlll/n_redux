// gml_Object_imparcor_demo_Alarm_10  locals=1 args=0 len=144
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 10
00000018: conv.i.v
0000001C: push.imm.e 20
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 156
00000034: pushenv 0x21B9EE8
00000038: push.imm.e 1
0000003C: conv.i.v
00000040: call action_set_relative(argc=1)
00000048: popz
0000004C: push.v mon
00000054: push.imm.e -1
00000058: add.i.v
0000005C: pop.v.v mon
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: call action_set_relative(argc=1)
00000074: popz
00000078: popenv 0x41B9EA8
0000007C: push.imm.e 0
00000080: conv.i.v
00000084: call action_set_relative(argc=1)
0000008C: popz