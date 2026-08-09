// gml_Object_r12_Alarm_6  locals=2 args=0 len=432
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v diron
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20C5510
0000004C: push.v diron
00000054: push.imm.e -1
00000058: add.i.v
0000005C: pop.v.v diron
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: push.imm.e 0
00000070: conv.i.v
00000074: push.imm.e 162
00000078: conv.i.v
0000007C: call action_if_number(argc=3)
00000084: pop.v.v local.__b__
0000008C: push.local.v local.__b__
00000094: conv.v.b
00000098: bf 0x20C5470
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: call action_set_relative(argc=1)
000000AC: popz
000000B0: push.imm.e 2120
000000B4: conv.i.v
000000B8: push.imm.e 900
000000BC: conv.i.v
000000C0: call random_range(argc=2)
000000C8: push.imm.e -1000
000000CC: conv.i.v
000000D0: push.imm.e 85
000000D4: conv.i.v
000000D8: call action_create_object(argc=3)
000000E0: popz
000000E4: push.imm.e 1
000000E8: conv.i.v
000000EC: call action_set_relative(argc=1)
000000F4: popz
000000F8: b 0x20C54CC
000000FC: push.imm.e 0
00000100: conv.i.v
00000104: call action_set_relative(argc=1)
0000010C: popz
00000110: push.imm.e 2620
00000114: conv.i.v
00000118: push.imm.e 900
0000011C: conv.i.v
00000120: call random_range(argc=2)
00000128: push.imm.e -1000
0000012C: conv.i.v
00000130: push.imm.e 85
00000134: conv.i.v
00000138: call action_create_object(argc=3)
00000140: popz
00000144: push.imm.e 1
00000148: conv.i.v
0000014C: call action_set_relative(argc=1)
00000154: popz
00000158: push.imm.e 0
0000015C: conv.i.v
00000160: call action_set_relative(argc=1)
00000168: popz
0000016C: push.imm.e 6
00000170: conv.i.v
00000174: push.imm.e 600
00000178: conv.i.v
0000017C: call action_set_alarm(argc=2)
00000184: popz
00000188: push.imm.e 1
0000018C: conv.i.v
00000190: call action_set_relative(argc=1)
00000198: popz
0000019C: push.imm.e 0
000001A0: conv.i.v
000001A4: call action_set_relative(argc=1)
000001AC: popz