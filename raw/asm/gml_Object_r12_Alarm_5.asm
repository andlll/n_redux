// gml_Object_r12_Alarm_5  locals=2 args=0 len=440
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v bombn
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20C5684
0000004C: push.v bombn
00000054: push.d -0.5
00000060: add.d.v
00000064: pop.v.v bombn
0000006C: push.imm.e 0
00000070: conv.i.v
00000074: push.imm.e 0
00000078: conv.i.v
0000007C: push.imm.e 162
00000080: conv.i.v
00000084: call action_if_number(argc=3)
0000008C: pop.v.v local.__b__
00000094: push.local.v local.__b__
0000009C: conv.v.b
000000A0: bf 0x20C5628
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: call action_set_relative(argc=1)
000000B4: popz
000000B8: push.imm.e 1620
000000BC: conv.i.v
000000C0: push.imm.e 380
000000C4: conv.i.v
000000C8: call random_range(argc=2)
000000D0: push.imm.e -170
000000D4: conv.i.v
000000D8: push.imm.e 78
000000DC: conv.i.v
000000E0: call action_create_object(argc=3)
000000E8: popz
000000EC: push.imm.e 1
000000F0: conv.i.v
000000F4: call action_set_relative(argc=1)
000000FC: popz
00000100: b 0x20C5684
00000104: push.imm.e 0
00000108: conv.i.v
0000010C: call action_set_relative(argc=1)
00000114: popz
00000118: push.imm.e 3120
0000011C: conv.i.v
00000120: push.imm.e 380
00000124: conv.i.v
00000128: call random_range(argc=2)
00000130: push.imm.e -170
00000134: conv.i.v
00000138: push.imm.e 78
0000013C: conv.i.v
00000140: call action_create_object(argc=3)
00000148: popz
0000014C: push.imm.e 1
00000150: conv.i.v
00000154: call action_set_relative(argc=1)
0000015C: popz
00000160: push.imm.e 0
00000164: conv.i.v
00000168: call action_set_relative(argc=1)
00000170: popz
00000174: push.imm.e 5
00000178: conv.i.v
0000017C: push.imm.e 200
00000180: conv.i.v
00000184: call action_set_alarm(argc=2)
0000018C: popz
00000190: push.imm.e 1
00000194: conv.i.v
00000198: call action_set_relative(argc=1)
000001A0: popz
000001A4: push.imm.e 0
000001A8: conv.i.v
000001AC: call action_set_relative(argc=1)
000001B4: popz