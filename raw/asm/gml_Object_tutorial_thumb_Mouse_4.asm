// gml_Object_tutorial_thumb_Mouse_4  locals=2 args=0 len=516
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: conv.i.v
0000001C: call instance_number(argc=1)
00000024: push.imm.e 0
00000028: cmp.i.v >
0000002C: bf 0x21EDC48
00000030: push.imm.e 518
00000034: pop.v.i sprite_index
0000003C: b 0x21EDC54
00000040: push.imm.e 1358
00000044: pop.v.i sprite_index
0000004C: push.imm.e 7
00000050: pushenv 0x21EDC98
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 4
00000060: conv.i.v
00000064: push.v phase
0000006C: call action_if_variable(argc=3)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x21EDC98
0000008C: b 0x21EDCA0
00000090: popenv 0x41EDC5C
00000094: b 0x21EDCA4
00000098: popenv 0x1DEDCA0
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x21EDCD8
000000AC: push.imm.e 267
000000B0: conv.i.v
000000B4: push.v obj193.y
000000BC: push.v obj193.x
000000C4: call instance_create(argc=3)
000000CC: popz
000000D0: push.imm.e 7
000000D4: pushenv 0x21EDD1C
000000D8: push.imm.e 1
000000DC: conv.i.v
000000E0: push.imm.e 33
000000E4: conv.i.v
000000E8: push.v phase
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x21EDD1C
00000110: b 0x21EDD24
00000114: popenv 0x41EDCE0
00000118: b 0x21EDD28
0000011C: popenv 0x1DEDD24
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x21EDD68
00000130: push.imm.e 7
00000134: pushenv 0x21EDD60
00000138: push.v phase
00000140: push.d 0.5
0000014C: add.d.v
00000150: pop.v.v phase
00000158: popenv 0x41EDD40
0000015C: b 0x21EDDF8
00000160: push.imm.e 0
00000164: conv.i.v
00000168: call action_set_relative(argc=1)
00000170: popz
00000174: push.imm.e 0
00000178: conv.i.v
0000017C: push.imm.e 0
00000180: conv.i.v
00000184: push.imm.e 717
00000188: conv.i.v
0000018C: call action_create_object(argc=3)
00000194: popz
00000198: push.imm.e 1
0000019C: conv.i.v
000001A0: call action_set_relative(argc=1)
000001A8: popz
000001AC: push.imm.e 0
000001B0: conv.i.v
000001B4: call action_set_relative(argc=1)
000001BC: popz
000001C0: push.imm.e 0
000001C4: conv.i.v
000001C8: push.imm.e 30
000001CC: conv.i.v
000001D0: call action_set_alarm(argc=2)
000001D8: popz
000001DC: push.imm.e 1
000001E0: conv.i.v
000001E4: call action_set_relative(argc=1)
000001EC: popz
000001F0: push.imm.e 0
000001F4: conv.i.v
000001F8: call action_set_relative(argc=1)
00000200: popz