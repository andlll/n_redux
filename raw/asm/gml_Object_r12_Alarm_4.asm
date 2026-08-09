// gml_Object_r12_Alarm_4  locals=2 args=0 len=388
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 1
00000018: pop.v.i autocore
00000020: push.imm.e 2
00000024: conv.i.v
00000028: push.imm.e 0
0000002C: conv.i.v
00000030: push.v ondan
00000038: call action_if_variable(argc=3)
00000040: pop.v.v local.__b__
00000048: push.local.v local.__b__
00000050: conv.v.b
00000054: bf 0x20C5824
00000058: push.imm.e 1
0000005C: conv.i.v
00000060: call action_set_relative(argc=1)
00000068: popz
0000006C: push.v ondan
00000074: push.d -0.5
00000080: add.d.v
00000084: pop.v.v ondan
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: call action_set_relative(argc=1)
0000009C: popz
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: push.imm.e 162
000000B4: conv.i.v
000000B8: call action_if_number(argc=3)
000000C0: pop.v.v local.__b__
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x20C57EC
000000D8: push.imm.e 1620
000000DC: conv.i.v
000000E0: push.imm.e 380
000000E4: conv.i.v
000000E8: call random_range(argc=2)
000000F0: push.imm.e -170
000000F4: conv.i.v
000000F8: push.imm.e 77
000000FC: conv.i.v
00000100: call action_create_object(argc=3)
00000108: popz
0000010C: b 0x20C5820
00000110: push.imm.e 3120
00000114: conv.i.v
00000118: push.imm.e 380
0000011C: conv.i.v
00000120: call random_range(argc=2)
00000128: push.imm.e -170
0000012C: conv.i.v
00000130: push.imm.e 77
00000134: conv.i.v
00000138: call action_create_object(argc=3)
00000140: popz
00000144: b 0x20C5830
00000148: push.imm.e 0
0000014C: pop.v.i autocore
00000154: push.imm.e 4
00000158: conv.i.v
0000015C: push.imm.e 60
00000160: conv.i.v
00000164: call action_set_alarm(argc=2)
0000016C: popz
00000170: push.imm.e 0
00000174: conv.i.v
00000178: call action_set_relative(argc=1)
00000180: popz